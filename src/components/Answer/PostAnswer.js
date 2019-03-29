import React from 'react';
import './answer.css';

const PostAnswer = (props) => {
    const { title, description, submitAnswerHandler, onChangeAnswerHandler } = props;
        return(
            <div className="post-new-answer">
                <form onSubmit={submitAnswerHandler}>
                    <div className="inputbox-anstitle">
                        <input type="text" placeholder="Answer Title" value={title} onChange={(e) => onChangeAnswerHandler("anstitle", e.target.value)} />
                    </div>
                    <div className="inputbox-ansdesc">
                        <textarea type="text" placeholder="Answer Description" value={description} onChange={(e) => onChangeAnswerHandler("ansdesc", e.target.value)} />
                    </div>
                    <div className="submit">
                        <button className="btn btn-primary">Post Your Answer</button>
                    </div>
                </form>
            </div>
        );
}
export default PostAnswer;
