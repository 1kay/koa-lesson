export default () => {
    return async ( ctx , next ) => {
        // todo
        console.log('MiddleWare 2 Start')
        await next()
        // todo
        console.log('MiddleWare 2 End')
    }
}