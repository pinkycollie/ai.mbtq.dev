import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Language AI Model | Pinky's AI Projects",
  description: "An interactive sign language AI model that translates sign language in real-time",
}

export default function SignLanguageAIPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Sign Language AI Model</h1>

      <div className="mb-8">
        <p className="text-lg mb-4">
          This interactive AI model translates sign language in real-time, making communication more accessible.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
        <div className="relative aspect-video w-full">
          <iframe
            src="https://pinkycollie-sign-language-ai-bot.static.hf.space"
            frameBorder="0"
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="Sign Language AI Model"
            allow="accelerometer; camera; microphone; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
        <p className="mb-4">
          This sign language AI model was developed to bridge communication gaps between the deaf community and those
          who don't understand sign language. The model uses computer vision to recognize hand gestures and translate
          them into text in real-time.
        </p>
        <p>
          Built using machine learning techniques and deployed on Hugging Face Spaces, this project demonstrates my
          interest in accessibility and AI applications.
        </p>
      </div>

      <div className="mt-8 bg-gradient-to-r from-slate-100 to-gray-100 border border-gray-200 p-6 rounded-lg text-gray-900">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <img src="/images/aws-genasl-blog.png" alt="AWS GenASL" className="w-8 h-8 mr-3" />
          AWS GenASL Integration
        </h2>
        <p className="mb-4 text-gray-800">
          This project leverages Amazon's GenASL (Generative AI-powered American Sign Language avatars) technology to
          create expressive ASL avatar animations from speech and text inputs.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-gray-800">
            <h3 className="font-semibold mb-2 text-gray-900">Key AWS Services Used:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              <li>Amazon Transcribe - Speech-to-text conversion</li>
              <li>Amazon SageMaker - ML model deployment</li>
              <li>Amazon Bedrock - Foundation model capabilities</li>
              <li>AWS Step Functions - Workflow orchestration</li>
              <li>AWS Amplify - Frontend hosting and APIs</li>
            </ul>
          </div>

          <div className="text-gray-800">
            <h3 className="font-semibold mb-2 text-gray-900">Enhanced Capabilities:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              <li>Real-time ASL avatar generation</li>
              <li>Expressive facial animations</li>
              <li>Natural hand gesture movements</li>
              <li>Multi-modal input support (text, speech, video)</li>
              <li>Scalable cloud infrastructure</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded border-l-4 border-blue-600 text-gray-800">
          <p className="text-sm text-gray-700">
            <strong>AWS GenASL Architecture:</strong> Our implementation follows AWS's recommended architecture pattern,
            utilizing serverless functions and managed AI services to ensure scalability and reliability.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 flex items-center mx-auto">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          DEPLOY
        </button>
        <p className="text-sm text-gray-600 mt-2">Deploy this AI model to your own infrastructure</p>
      </div>
    </div>
  )
}
