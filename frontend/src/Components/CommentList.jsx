import React from "react";
import format from 'date-fns/format';

const CommentList = ({slug}) => {
    const [comments, setComments] = React.useState([]);

    const fetchComments = async () => { 
        try{
            const response = await fetch(`http://127.0.0.1:8000/blog/comment/${slug}`)
            const data = await response.json()
            setComments(data)
        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(() => {
        fetchComments();
    }, [])

    return (
        <div>
            {comments.map((comment) => {
                return (
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h6 className="card-title">{comment.user.toUpperCase()}</h6>
                                <p className="card-text">{format(comment.created_at, 'dd LLLL, yyyy')}</p>
                            </div>
                            <p className="card-text">{comment.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CommentList;