"use client"

import { redirect, useParams } from "next/navigation"

const EncodeRandomToolPage = () => {
  const { encode } = useParams();
  // @ -> `,`
  // . -> `.`
  // _ -> `!`
  const members = decodeURIComponent(encode as string).split('@').map(mem => mem.startsWith('_') ? mem.replace(/_/, '!') : mem);

  return redirect(`/p/tools/random?members=${members.join(',')}`)
}

export default EncodeRandomToolPage;