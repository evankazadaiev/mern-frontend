import React, {useMemo} from "react";
import MicrolinkCard from '@microlink/react';
import Linkify from 'linkifyjs/react';
import Emojify from 'react-emojione';
import * as getUrls from 'get-urls';

import './style.scss';

const Message = ({ userId, message }) => {
  const { content, userFrom, createdAt } = message;

  const my = useMemo(() => userId === userFrom, [userId, userFrom]);

  const messageTime = new Date(createdAt).toLocaleDateString();
  
  const messageClasses = useMemo(() => `message ${my ? 'my' : ''}`, [my]);

  const parseURLs = (text) => {
    const urls = getUrls(text);
    if (!urls.size) {
      return;
    }

    const parsedUrls = Array.from(urls).map((url, idx) => (
      <MicrolinkCard url={url} key={idx}/>
    ));
    return <>{parsedUrls}</>
  };
  
  return (
    <div className={messageClasses}>
      <div className="message__text">
        <div className="message__text__content">
          <Linkify><Emojify>{content} {parseURLs(content)}</Emojify></Linkify>
        </div>
        <div className="message__time">{ messageTime }</div>
      </div>
    </div>
  )
};


export default Message;
