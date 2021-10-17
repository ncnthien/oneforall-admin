import { useState } from 'react'
import Truncate from 'react-truncate'
import { ReadMoreProps } from 'features/Brand/interface'

const ReadMore: React.FC<ReadMoreProps> = ({ children, more, less, lines }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)

  const handleTruncate = (truncated: boolean) => {
    if (isTruncated !== truncated) {
      setIsTruncated(truncated)
    }
  }

  const toggleLines = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <Truncate
        lines={!isExpanded && lines}
        ellipsis={
          <span>
            ...{' '}
            <button onClick={toggleLines} className='text-cyan-400'>
              {more}
            </button>
          </span>
        }
        onTruncate={handleTruncate}
        trimWhitespace
      >
        {children}
      </Truncate>
      {!isTruncated && isExpanded && (
        <span>
          {' '}
          <button onClick={toggleLines} className='text-cyan-400'>
            {less}
          </button>
        </span>
      )}
    </div>
  )
}

export default ReadMore
