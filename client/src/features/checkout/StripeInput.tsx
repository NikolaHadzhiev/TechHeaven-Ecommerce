import { InputBaseComponentProps } from "@mui/material";
import { Ref, forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends InputBaseComponentProps {}

export const StripeInput = forwardRef(function StripeInput({component: Component, ...props}: Props, ref: Ref<unknown>) {
    const elementRef = useRef<any>();

    useImperativeHandle(ref, () => {
        return {
            focus() {
                 elementRef.current.focus();
            }
        }
    })

    return <Component onReady={(element: any) => elementRef.current = element} {...props}/>
})