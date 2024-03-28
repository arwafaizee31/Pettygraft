import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <>
       
   
     
   
        <input
            {...props}
            type={type}
            className={
                'border-t-0 border-l-0 border-r-0 border-b-gray-300 focus:border-gray-950 focus:ring-gray-300' +
                className   
            }
            ref={input}
            
        />
        </>
    );
});
