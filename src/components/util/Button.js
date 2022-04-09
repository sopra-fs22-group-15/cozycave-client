import React from "react";
import PropTypes from "prop-types"


/**
 * Custom Button component.
 * @component
 * @example
 *<Button type="button" variant="primary" outlined={true}>Sign Up</Button>
 */

const Button = (props) => {

    const {outlined, variant, size, opts, type, children} = props;

    let classNameString = `${!variant ? "primary" : ""}${outlined ? "btn-outline-" + variant : "btn-" + variant}${size || ""} ${opts || ""}`;
    return (
        <button type={type}
                className={"btn " + classNameString}>
            {children}
        </button>
    )
}

Button.propTypes = {
    /**
     * Change type of button, recommended use with "button", but can also be used as e.g. "submit".
     * @see https://getbootstrap.com/docs/5.1/components/buttons/#button-tags
     * */

    type: PropTypes.oneOf(["input", "submit", "button", "reset"]),
    /**
     * Choose variant of button, default="primary"
     * @see https://getbootstrap.com/docs/5.1/components/buttons/)
     * */
    variant: PropTypes.string,
    /**
     * Set to true to display outlined button, default is false.
     * @see https://getbootstrap.com/docs/5.1/components/buttons/#outline-buttons
     * */
    outlined: PropTypes.bool,
    /**
     * Optional props to add stuff like margin or extra CSS. (e.g. class="me-2" -> adds margin right).
     *
     * */
    opts: PropTypes.string,
    /**
     * Choose between button sizes: "sm" for small or "lg" for large.
     * @see https://getbootstrap.com/docs/5.1/components/buttons/#sizes
     * */
    size: PropTypes.oneOf(["lg", "sm"]),
    /**
     * Content of the button.
     *
     * */
    children: PropTypes.node.isRequired
};

export default Button;