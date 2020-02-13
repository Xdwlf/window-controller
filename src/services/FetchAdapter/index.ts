import SwaggerClient from 'swagger-client';
import ApiEmitter from '../EventEmitter';
import spec from './swagger.json';

SwaggerClient.http.withCredentials = true;

export interface IfcObjectValues {
    param1: number[];
    param2: string;
    param3: string;
}

interface Args {
    requestBody?: object;
    [key: string]: any;
}

interface SwaggerCall {
    (arg: any, callOptions: any): Promise<any>;
}
interface Apis {
    [key: string]: ApiResolve;
}
interface ApiResolve {
    [key: string]: SwaggerCall;
}

interface ApiHeaders {
    'content-type': string;
}
interface ApiResponse<T> {
    body: object;
    data: T;
    headers: ApiHeaders;
    obj: T;
    ok: boolean;
    status: number;
    statusText: string;
    text: string;
    url: string;
}
interface SwaggerInstance {
    apis: Apis;
    originalSpec: object;
    spec: object;
    usePromise: boolean;
    execute<T>(s: any): Promise<ApiResponse<T>>;
}
interface ApiOptions {
    skipErrorPage?: boolean;
    requestContentType?: string;
}

class ApiService {
    private _instance: SwaggerInstance | undefined;

    private _instancePromise: Promise<SwaggerInstance>;

    private apiEmitter = new ApiEmitter();

    public constructor() {
        const config = {
            spec,
            usePromise: true,
            failure: (error: Error): void => {
                throw error;
            },
        };
        this._instancePromise = new SwaggerClient(config)
            .then((swaggerInstance: SwaggerInstance) => {
                this._instance = swaggerInstance;
                console.log("Swagger instance ready"); // eslint-disable-line
                return swaggerInstance;
            })
            .catch((error: Error) => {
                Promise.reject(error);
            });
    }

    private getInstance = (): Promise<SwaggerInstance> => {
        if (this._instance !== undefined) {
            return Promise.resolve(this._instance);
        }
        return this._instancePromise;
    };

    private handleCallError = <U>(options?: ApiOptions) => (apiError: any): PromiseLike<U> => {
        if (apiError.status === 401) {
            window.location.replace(process.env.FILEROOM_REDIRECT as string);
        } else if (apiError.status >= 400 && apiError.status <= 550) {
            if (options && options.skipErrorPage !== true) {
                // history.push('/error');
                // TODO: ROUTING figure out what to do instead of history

            }
        }

        throw apiError;
    };

    private triggerApiCall = <T>(operationId: string, arg?: Args, options?: ApiOptions) =>
        (instance: SwaggerInstance): Promise<ApiResponse<T>> => {
            const parameters = arg;
            let requestBody;
            if (parameters && parameters.requestBody) {
                requestBody = parameters.requestBody;
                delete parameters.requestBody;
            }
            return instance.execute<T>({
                server: process.env.API_ENDPOINT,
                operationId,
                parameters,
                requestBody,
                requestContentType: options && options.requestContentType,
            });
        };

    private dispatchCallType = <T>(path: string): (r: T) => T => (resp: T): T => {
        this.apiEmitter.emit(path, resp);
        return resp;
    };

    public subscribe = (events: string[] | string, callback: (s: string) => void): void => {
        this.apiEmitter.subscribe(events, callback);
    };

    public unSubscribe = (events: string[] | string, callback: (s: string) => void): void => {
        this.apiEmitter.unSubscribe(events, callback);
    };

    public handleApiResponse = <T>(resp: ApiResponse<T>): T => {
        if (resp.headers['content-type'] === 'application/octet-stream') {
            return resp.data;
        }
        return resp.obj;
    }

    public call = <T, U = T>(path: string, arg?: Args, options?: ApiOptions): Promise<T | U> =>
        this.getInstance()
            .then(this.triggerApiCall<T>(path, arg, options))
            .then(this.handleApiResponse)
            .then(this.dispatchCallType(path))
            .catch(this.handleCallError<U>(options))
}

export default new ApiService();
