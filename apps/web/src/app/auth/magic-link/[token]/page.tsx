import VerifyMagiclink from './verify-magic-link'

export default async function MagicLinkTokenVerifierPage({
  params,
}: {
  params: { token: string }
}) {
  return <VerifyMagiclink secret={params.token} />
}
