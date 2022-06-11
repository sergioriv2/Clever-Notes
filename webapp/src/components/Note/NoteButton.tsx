import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface NoteButtonProps{
    icon: string;
    handleClick: Function
}

const NoteButton = (props: NoteButtonProps & FontAwesomeIconProps) => {

    const { icon, handleClick } = props

    return(
        <div 
            className="noteButton d-inline-flex justify-content-center align-items-center" 
            onClick={() => handleClick()}
        >
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </div>
    )
}

export default NoteButton;