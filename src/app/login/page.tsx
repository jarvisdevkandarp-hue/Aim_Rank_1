import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function Login() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  const signInWithGoogle = async () => {
    'use server'
    const supabase = await createClient()
    const origin = (await headers()).get('origin')
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(error)
      return
    }

    if (data.url) {
      redirect(data.url)
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 m-auto mt-20">
      <form action={signInWithGoogle} className="flex flex-col w-full justify-center gap-2 text-foreground">
        <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition-colors">
          Sign In with Google
        </button>
      </form>
    </div>
  )
}
