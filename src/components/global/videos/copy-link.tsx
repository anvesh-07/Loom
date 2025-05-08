import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, Link2 } from "lucide-react";
import React from "react";

type Props = {
  videoId: string;
  className?: string;
  varients?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
};

const CopyLink = ({ videoId, className, varients }: Props) => {
  const { toast } = useToast();
  const onCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
    );
    return toast({
      title: "Link copied!",
      description: "Your video link has been copied to your clipboard.",
      variant: "default",
      duration: 3000,
    });
  };
  return (
    <Button variant={varients} onClick={onCopyClipboard} className={className}>
      <Link2 size={20} className="text-[#a4a4a4]" />
    </Button>
  );
};

export default CopyLink;
