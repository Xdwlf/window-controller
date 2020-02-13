interface CssModule {
    readonly [key: string]: string;
}

declare module '*.less' {
    const content: CssModule;
    export default content;
}

declare namespace Styles {
    type Css = CssModule
}
