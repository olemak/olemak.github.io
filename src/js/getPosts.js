import {createClient} from 'contentful'

const getPosts = () => {
    let client = createClient({
        space: 'y7jhvpcyb2y8',
        accessToken: '7871df3659bf27af877eb2d913229a27dde93785633427d55eecf65c0e534d2c'
    })

    client.getEntries().then(entries=>{window.posts = entries})
}

export default getPosts