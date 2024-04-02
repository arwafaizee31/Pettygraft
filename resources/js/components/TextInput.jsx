import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, icon,...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            
        }
    }, []);

    return (
        <>
       
   
       <div className="relative">
   
        <input
            {...props}
            type={type}
            className={
                'custom-textInput pl-10 pr-4 py-2' +
                className   
            }
            ref={input}
            
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
    </div>
        </>
    );
});
