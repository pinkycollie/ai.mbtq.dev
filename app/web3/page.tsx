import { ThirdwebSetup } from "@/components/thirdweb-setup"

export default function Web3Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Web3 Setup</h1>
        <p className="text-muted-foreground">Configure Thirdweb and Web3 features for your projects</p>
      </div>
      <ThirdwebSetup />
    </div>
  )
}
