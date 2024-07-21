import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ButtonProps {
      isLoading: boolean;
      className?: string;
      children: React.ReactNode;
}

const SubmitButton: React.FC<ButtonProps> = ({ isLoading, className, children }) => {
      return (
            <Button
                  type="submit"
                  disabled={isLoading}
                  className={className ?? "shad-primary-btn w-full"}
            >
                  {isLoading ? (
                        <div>
                              <Image
                                    className="animate-spin"
                                    src="assets/icons/loader.svg"
                                    alt="loader"
                                    width={24}
                                    height={24}
                              />
                        </div>
                  ) : (
                        children
                  )}
            </Button>
      );
};

export default SubmitButton;
