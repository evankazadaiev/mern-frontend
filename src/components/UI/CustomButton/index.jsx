import React, {useCallback} from "react";
import Spinner from "../../Spinner";
import './styles.scss';


const CustomButton = ({ children, disabled, isLoading, ...rest}) => {
  const classes = useCallback(() => `btn ${isLoading ? 'loading': ''}`, [isLoading]);
  const ButtonContent = () => ( isLoading ? <Spinner/> : children );
  return (
    <button className={classes()} disabled={disabled} { ...rest }>
      <ButtonContent/>
    </button>
  )
};


export default CustomButton;
