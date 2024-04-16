import React, { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

const Action = forwardRef(({
  onClick,
  children,
  className,
  href,
  rel,
  target,
  textColor,
  reload = false,
  ...props
},
  ref
) => {
  let ActionComponent = href ? Link : "button";
  const additionalProps = href
    ? { href, rel, target }
    : { onClick, ...props };

  if (reload && href) {
    additionalProps.onClick = (e) => {
      e.preventDefault();
      window.location.href = href;
    };
  }


  return (
    <ActionComponent
      ref={ref}
      className={clsx(
        "py-4 transition font-body text-xl font-normal antialiased rounded-md border-2 hover:bg-transparent hover:border-solid hover:border-2",
        { "text-white": textColor !== "black" },
        { "text-black": textColor === "black" },
        className
      )}
      {...additionalProps}
    >
      {children}
    </ActionComponent>
  );
}
);

Action.displayName = "Action";

export default Action;