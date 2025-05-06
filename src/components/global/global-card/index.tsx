import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
  description: string;
  footer?: React.ReactNode;
};

const GlobalCard = ({ title, children, description, footer }: Props) => {
  return (
    <Card className="bg-transparent mt-4">
      <CardHeader className="text-md text-[#9D9D9D] ml-3">{title}</CardHeader>
      <CardDescription className="text-[#707070] ml-3">
        {description}
      </CardDescription>
      {children && <div className="p-4">{children}</div>}
      {footer && <div className="p-4">{footer} </div>}
    </Card>
  );
};

export default GlobalCard;
