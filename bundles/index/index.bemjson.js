({
    block: 'page',
    content: [
        {
            elem: 'head',
            content: [
                { elem: 'js', url: '../../node_modules/ym/modules.js' },
                { elem: 'js', url: '_index.js' },
                { elem: 'css', url: '_index.css' }
            ]
        },
        {
            elem: 'body',
            content: {
                block: 'input'
            }
        }
    ]
})