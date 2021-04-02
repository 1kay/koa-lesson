export default () => {
    return async ( ctx , next ) => {
        // todo
        console.log('MiddleWare 3 Start')
        await next()
        // todo
        console.log('MiddleWare 3 End')
    }
}