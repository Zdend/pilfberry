
const layout = (body, initialState) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Special Diet</title>
            <meta name="description" content="Special Diet">
            <meta name="author" content="ZDV">
           
        </head>
        <body>
            <div id="root"><div>${body}</div></div>
            <script type="text/javascript" charset="utf-8">
              window.__INITIAL_STATE__ = ${initialState};
            </script>
            <script src="/static/app.js"></script>
        </body>
    </html>
`);


const initialState = JSON.stringify({
    ui: {
        pages: {
            login: {
                credentials: {
                    login: 'zdenek.vecek@gmail.com',
                    password: 'password'
                }
            }
        },
        components: {
            footer: {
                language: { code: 'en' }
            }
        }
    },
    domain: {}
});

export default function (req, res) {
    res.send(layout('', initialState));
}