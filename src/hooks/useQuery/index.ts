// import { useLocation } from 'react-router';

type Params = { [key: string]: string };

function useQuery(): Params {
    const params: Params = {};
    // const searchParams = new window.URLSearchParams(useLocation().search);

    // searchParams.forEach((value: string, key: string) => {
    //     params[key] = value;
    // });
    return params;
}

export default useQuery;
