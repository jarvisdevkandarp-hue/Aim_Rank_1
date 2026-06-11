import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Terminal, Shield, Lock, ChevronRight, Fingerprint } from 'lucide-react'

export default async function Login(props: {
  searchParams: Promise<{ message: string }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
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
      return redirect(`/login?message=${error.message}`)
    }

    if (data.url) {
      redirect(data.url)
    }
  }

  const signInWithEmail = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=AUTHENTICATION_FAILED')
    }

    return redirect('/dashboard')
  }

  const signUpWithEmail = async (formData: FormData) => {
    'use server'
    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=SIGNAL_LOST')
    }

    return redirect('/login?message=UPLINK_PENDING_CHECK_INBOX')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[440px] space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 glass border-primary/30 flex items-center justify-center relative">
             <div className="absolute inset-0 bg-primary/10 animate-pulse" />
             <Shield className="w-8 h-8 text-primary relative z-10" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-widest uppercase glow-text">Access_Terminal</h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-[0.3em] uppercase">Security Clearance Required</p>
          </div>
        </div>

        <Card className="glass border-white/5 rounded-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardHeader className="border-b border-white/5 pb-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-primary tracking-widest uppercase mb-2">
               <Terminal className="w-3 h-3" />
               System_Uplink_v2.0
            </div>
            <CardTitle className="text-xl font-bold tracking-tight uppercase">Credential_Verification</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            {/* Google Auth */}
            <form action={signInWithGoogle}>
              <Button 
                variant="outline" 
                className="w-full border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white font-mono text-[10px] tracking-widest uppercase h-14 rounded-none group transition-all"
              >
                <svg className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  />
                </svg>
                Authorize_via_Google
              </Button>
            </form>

            <div className="relative flex justify-center text-[9px] font-mono uppercase tracking-[0.3em] text-white/20">
              <span className="bg-background px-4 relative z-10">Manual_Override</span>
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-0" />
            </div>

            {/* Email/Password */}
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Vector_Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="OPERATOR@MISSION.OS"
                    required
                    className="bg-white/[0.02] border-white/10 rounded-none h-12 pl-12 font-mono text-xs focus:border-primary/50 transition-all uppercase placeholder:text-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" title="password" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Access_Cipher</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-white/[0.02] border-white/10 rounded-none h-12 pl-12 font-mono text-xs focus:border-primary/50 transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button formAction={signInWithEmail} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-[10px] tracking-widest uppercase h-12 rounded-none">
                  Establish_Link
                </Button>
                <Button formAction={signUpWithEmail} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 font-mono text-[10px] tracking-widest uppercase h-12 rounded-none">
                  Register_Vector
                </Button>
              </div>

              {searchParams?.message && (
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
                   <Fingerprint className="w-5 h-5 text-primary shrink-0" />
                   <p className="font-mono text-[9px] text-primary uppercase tracking-widest leading-relaxed">
                     System_Message: {searchParams.message}
                   </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center px-2">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Encrypt: AES-256</span>
           </div>
           <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest italic">Proceed with absolute focus</span>
        </div>
      </div>
    </div>
  )
}
