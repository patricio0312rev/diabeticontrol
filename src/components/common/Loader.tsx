import { twMerge } from "tailwind-merge";

type LoaderProps = React.ComponentPropsWithRef<"span">;

export const Loader = ({ className, ...rest }: LoaderProps) => {
  return (
    <span
      className={twMerge(
        "animate-spin flex rounded-full border-solid h-4 w-4 border-2 border-transparent border-t-white",
        className
      )}
      {...rest}
    ></span>
  );
};
