function Messages({errorMessages}){return(
    <h3><strong>
        <div className="messages" id="messages" padding-left="3em">
        {errorMessages.map((e,i) => <p key={i}> {e} </p>)}
            </div></strong></h3>
    )
}

export default Messages;