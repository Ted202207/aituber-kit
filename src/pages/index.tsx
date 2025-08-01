import { Form } from '@/components/form'
import MessageReceiver from '@/components/messageReceiver'
import { Introduction } from '@/components/introduction'
import { Menu } from '@/components/menu'
import { Meta } from '@/components/meta'
import ModalImage from '@/components/modalImage'
import VrmViewer from '@/components/vrmViewer'
import Live2DViewer from '@/components/live2DViewer'
import { Toasts } from '@/components/toasts'
import { WebSocketManager } from '@/components/websocketManager'
import homeStore from '@/features/stores/home'
import settingsStore from '@/features/stores/settings'
import '@/lib/i18n'
import { buildUrl } from '@/utils/buildUrl'
import { YoutubeManager } from '@/components/youtubeManager'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home = () => {
  const { data: session } = useSession()
  const webcamStatus = homeStore((s) => s.webcamStatus)
  const captureStatus = homeStore((s) => s.captureStatus)
  const backgroundImageUrl = homeStore((s) => s.backgroundImageUrl)
  const useVideoAsBackground = settingsStore((s) => s.useVideoAsBackground)
  const bgUrl =
    (webcamStatus || captureStatus) && useVideoAsBackground
      ? ''
      : `url(${buildUrl(backgroundImageUrl)})`
  const messageReceiverEnabled = settingsStore((s) => s.messageReceiverEnabled)
  const modelType = settingsStore((s) => s.modelType)

  if (session) {
    return (
      <div className="h-[100svh] bg-cover" style={{ backgroundImage: bgUrl }}>
        <Meta />
        <Introduction />
        {modelType === 'vrm' ? <VrmViewer /> : <Live2DViewer />}
        <Form />
        <Menu />
        <ModalImage />
        {messageReceiverEnabled && <MessageReceiver />}
        <Toasts />
        <WebSocketManager />
        <YoutubeManager />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div
      className="h-[100svh] bg-cover flex items-center justify-center"
      style={{ backgroundImage: bgUrl }}
    >
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  )
}

export default Home
