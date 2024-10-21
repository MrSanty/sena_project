import { Button, Tooltip } from "@nextui-org/react"
import { FC, ReactNode } from "react"

interface ButtonModalTriggerProps {
  classNames?: {
    button: string;
    text: string;
  }
  onClick: () => void;
  isAction?: boolean;
  icon: ReactNode;
  text: string;
}

export const ButtonModalTrigger: FC<ButtonModalTriggerProps> = ({
  classNames,
  onClick,
  isAction = false,
  icon,
  text
}) => {
  if (isAction) {
    return (
      <Tooltip content={text} color="foreground" placement="top">
        <Button
          onClick={onClick}
          className={classNames?.button}
        >
          {icon}
        </Button>
      </Tooltip>
    )
  } else {
    return (
      <Button
        onClick={onClick}
        className={classNames?.button}
        size="sm"
        radius="sm"
      >
        {icon}
        <span className={classNames?.text}>{text}</span>
      </Button>
    )
  }
}