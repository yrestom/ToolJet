import React from 'react';
import cx from 'classnames';

import { commentsService } from '@/_services';

import { pluralize } from '@/_helpers/utils';

import Spinner from '@/_ui/Spinner';

import UnResolvedIcon from './icons/unresolved.svg';
import ResolvedIcon from './icons/resolved.svg';

const CommentHeader = ({ count = 0, threadId, isResolved, isThreadOwner, close }) => {
  const [resolved, setResolved] = React.useState(isResolved);
  const [spinning, setSpinning] = React.useState(false);

  const handleResolved = async () => {
    setSpinning(true);
    const { data } = await commentsService.updateThread(threadId, { isResolved: !resolved });
    setResolved(data.isResolved);
    setSpinning(false);
  };

  const getResolveIcon = () => {
    if (spinning) return <Spinner />;

    if (resolved) return <ResolvedIcon />;

    return <UnResolvedIcon />;
  };

  return (
    <div className="card-header">
      <div className="card-subtitle mt-1">{pluralize(count, 'comment')}</div>
      <div className="ms-auto d-flex">
        <span
          title={isThreadOwner ? 'toggle resolved' : 'only creator of thread can resolve'}
          className={cx('m-1', { disabled: !isThreadOwner })}
          onClick={handleResolved}
        >
          {getResolveIcon()}
        </span>
        <div onClick={close} className="m-1 cursor-pointer">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.64628 7.62107L11.6712 12.6474L12.647 11.673L7.62067 6.64669L12.647 1.62176L11.6726 0.645996L6.64628 5.6723L1.62136 0.645996L0.646973 1.62176L5.6719 6.64669L0.646973 11.6716L1.62136 12.6474L6.64628 7.62107Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CommentHeader;
