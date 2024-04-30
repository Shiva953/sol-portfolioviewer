"use client"

import React from "react";
import { Token, Attribute } from "../types/token";

interface TokenCardProps {
  token: Token;
  tokenType: string;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, tokenType }) => {
  return (
    <>
      {/* Other token information */}
      {tokenType === "fungible" ? (
        <>
          {token.content.metadata.symbol}
          {/* {token.content.metadata.description} */}
          Amount: {token.token_info.balance}
          {token.token_info.price_info?.total_price && (
            <>Value: ${token.token_info.price_info.total_price}</>
          )}
        </>
      ) : (
        <>
          {token.content.metadata.name}
          {token.content.metadata.description}
          {token.content.metadata?.attributes?.map(
            (attribute: Attribute, index: number) => (
              <div key={index}>
                {attribute.trait_type}: {attribute.value}
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default TokenCard;
