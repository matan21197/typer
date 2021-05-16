const TextViewComponent = (props) => {
    return (<div>
          <span className="passedText">{props.text.slice(0,props.completelyFinishedIndex)}</span>
          <span className="passedText">{props.text.slice(props.completelyFinishedIndex, props.completelyFinishedIndex + props.currentlyValidIndex)}</span>
          <span className="failedText">{props.text.slice(props.completelyFinishedIndex + props.currentlyValidIndex, props.completelyFinishedIndex + props.currentTextIndex)}</span>
          <span className="remainingText">{props.text.slice(props.completelyFinishedIndex + props.currentTextIndex)}</span>
        </div>)
}