export default () => {
    return async ( ctx , next ) => {
        // todo
        console.log('MiddleWare 1 Start')
        await next()
        // todo
        console.log('MiddleWare 1 End')
    }
}