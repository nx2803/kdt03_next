'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
import { useAtom } from 'jotai';
import { sessionAtom } from '@/AtomAuth';
import { FaGithub } from "react-icons/fa";
import type {Session, User} from '@supabase/supabase-js';
function Login() {
  // session 상태를 저장하는 state
  const [session, setSession] = useAtom<Session | null>(sessionAtom);
  // user 정보를 저장하는 state
  const [user, setUser] = useState<User | null>(null);

  // 컴포넌트가 마운트될 때 한 번 실행되는 useEffect
  useEffect(() => {
    // 현재 세션 정보를 가져와서 session state를 업데이트
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // 세션이 있으면 user 정보를, 없으면 null을 user state에 저장
      setUser(session?.user || null);
    });

    // 인증 상태 변경을 감지하는 리스너를 설정
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // 인증 상태가 변경되면 session state를 업데이트
      setSession(session);
      // 세션이 있으면 user 정보를, 없으면 null을 user state에 저장
      setUser(session?.user || null);
    });

    // 컴포넌트가 언마운트될 때 리스너를 정리
    return () => subscription.unsubscribe();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // GitHub OAuth를 사용하여 로그인하는 비동기 함수
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  // 로그아웃하는 비동기 함수
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // 세션이 없는 경우 (로그인되지 않은 상태)
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <button
          onClick={signInWithGithub} // 버튼 클릭 시 GitHub으로 로그인 함수 호출
          className=" flex flex-row bg-zinc-700 text-white rounded hover:bg-zinc-600"
        >
          <FaGithub className='m-3 mx-10 text-4xl'/>
        </button>
      </div>
    );
  } 
  // 세션이 있는 경우 (로그인된 상태)
  else {
    return (

      <div className="flex flex-col items-center justify-center h-full">
        {/* 사용자 이름 또는 이메일을 환영 메시지에 표시 */}
        <FaGithub className='text-6xl mb-5 '/>

        <h1 className="text-2xl font-bold mb-4">환영합니다, {user?.user_metadata?.user_name || user?.email}!</h1>
        {/* 사용자 이메일 표시 */}
        <p className="mb-4">이메일: {user?.email}</p>
        
        <button
          onClick={signOut} // 버튼 클릭 시 로그아웃 함수 호출
          className="px-4 py-2 bg-zinc-700/40 border border-yellow-500 text-white font-semibold rounded hover:border-red-600 transition-all  duration-200 ease-in-out"
        >
          로그아웃
        </button>
      </div>
    );
  }
}

export default Login;
