
"use client";

import React, { useState, useEffect } from "react";
import { Suspense } from 'react'
import fetchTokens from "../lib/searchAssets";
import TokenCard from "../components/TokenCard";
import { Token, Attribute } from "../types/token";

interface Tokens {
  items: Token[];
}

interface PageProps {
  params: {
    wallet: string;
  };
}

export default function Page({ params }: PageProps) {
  const [tokens, setTokens] = useState<Tokens|null>(null);
  const [tokenType, setTokenType] = useState("fungible");

  useEffect(() => {
    fetchTokens(params.wallet).then(setTokens).catch(console.error);
  }, [params.wallet]);

  console.log("tokens", tokens);

  const fungibleTokens = tokens
    ? tokens.items.filter(
        (token) =>
          token.interface === "FungibleToken" ||
          token.interface === "FungibleAsset"
      )
    : [];

  const nonFungibleTokens = tokens
    ? tokens.items.filter(
        (token) =>
          token.interface !== "FungibleToken" &&
          token.interface !== "FungibleAsset"
      )
    : [];

  const displayedTokens =
    tokenType === "fungible" ? fungibleTokens : nonFungibleTokens;

  return (
        <div>
      <h1>Portfolio Viewer {params.wallet}</h1>
      <button onClick={() => setTokenType("fungible")}>Fungible Tokens</button>
      <button onClick={() => setTokenType("nonFungible")}>Non-Fungible Tokens</button>
      <Suspense fallback={<p>Loading...</p>}>
      {displayedTokens.length > 0 ? (
        displayedTokens.map((token) => <TokenCard key={token.id} token={token} tokenType={tokenType} />)
      ) : (
        <p>Loading...</p>
      )}
      </Suspense>
      {/* {tokens === null ? (
      <p>Loading...</p>
    ) : (
      displayedTokens.length > 0 ? (
        displayedTokens.map((token) => <TokenCard key={token.id} token={token} tokenType={tokenType} />)
      ) : (
        <p>Loading...</p>
      )
    )} */}
    </div>
  );
}