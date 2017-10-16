// @flow

import React from 'react';

const Comment = ({ comment, formatDate, saveReply, cancelReply, showReply }) => (
    <div className="comment-wrapper">
        <div className="comment-data-wrapper">
            <div className="comment-name-date"><span className="dot-mark">&#149;</span> {comment.author_name} | { formatDate(comment.date_created)}</div>
            <div className="comment-content">{ comment.content }</div>
            <div className="comment-reply-toggle" onClick={console.log('show reply')}>Reply</div>
            <div className="comment-reply" v-if="replyVisible">
                <input v-model="replyAuthor" placeholder="Your name" type="text" value="Your name"/>
                    <textarea v-model="replyContent" placeholder="Write a reply..."></textarea>

                    <div v-if="isInputError" className="input-error">You have to fill all the fields</div>

                    <div className="comment-reply-buttons">
                        <button onClick={console.log('add reply')}>Save</button>
                        <button onClick={console.log('hide reply')}>Cancel</button>
                    </div>
            </div>
        </div>

        { comment.children.length > 0 && (<comments comments="comment.children"></comments>) }
    </div>
);

export default Comment;
