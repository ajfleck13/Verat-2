import { GET_MORE_POSTS, NEW_POST } from './types'

export function getMorePosts(repositorytext) {
    return function(dispatch) {
        let inputArray = repositorytext.split("/");
        let username = inputArray[0];
        let repo = inputArray[1];
        
        let params = "?" + $.param({
            "state": "all",
            'per_page': 100,
        })
    
        urlRepo = baseURL + `/repos/${username}/${repo}/issues` + params,
        
        axios.get(urlRepo)
        .then(function(response) {
            dispatch({
                type: GET_MORE_POSTS,
                payload: response
            });
        })
    }
}