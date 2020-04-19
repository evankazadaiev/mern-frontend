import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from 'react-router-dom';
import SelectChatMessage from "../SelectChatMessage";
import Loader from '../Loader';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { messagesLoading } from '../../redux/progress/selectors';

import './style.scss';

const MessagesWrapper = ({ messages, loading }) => {
  const [first, setFirst] = useState(false);
  const params = useParams();
  const paramsLength = Object.keys(params).length;

  const content = useMemo(() => paramsLength ? messages : <div className="default_message"><SelectChatMessage/></div>, [paramsLength, messages]);
  const wrapper = useRef(null);

  useEffect(() => {
    const current = wrapper.current;
    if (first) {
      current.scrollTop = current.scrollHeight
    } else if (current.scrollTop + current.clientHeight === current.scrollHeight) {
      current.scrollTop = current.scrollHeight
    }
  }, [first, messages])

  useEffect(() => setFirst(true), []);

  return (
    <div ref={wrapper} className="messages-wr scrollbar" >
        { loading ? <Loader/> : content }
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  loading: messagesLoading
})


export default connect(mapStateToProps)(MessagesWrapper);
