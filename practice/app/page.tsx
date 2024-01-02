'use client';

import styles from '/app/page.module.css'
import { useState } from 'react';  // CSS 모듈(page.module.css)을 사용하여 컴포넌트에 스타일을 적용 
import React, { useRef } from 'react'; // React 라이브러리에서 React 객체와 useRef 훅을 불러옴

import { contentText, contentTextTwo, memberData } from './data/content';

// 홈 컴포넌트를 정의함
export default function Home() {
  // React HOOK -  useState 사용하여 상태를 관리함
  // 'section'은 현재 선택된 멤버의 'hash' 값을 저장하며, 'setSection'은 'section' 상태를 업데이트하는 함수임
  const [section, setSection] = useState('');
  // useRef를 사용하여 inputRef 생성
  const inputRef = useRef<HTMLInputElement | null>(null); 

  // 멤버 이름이 클릭되었을 때 호출되는 함수
  // 선택된 멤버의 'hash' 값을 'section' 상태로 업데이트하고, 현재 페이지의 해시 값을 변경함
  const nameClick = (targetSection: string) => {
    setSection(targetSection);
    window.location.hash = `#${targetSection}`;
  };

  // 검색 버튼이 클릭되었을 때 호출되는 함수
  const handleSearch = () => {
    // input 요소의 값에 접근함
    if (inputRef.current) {
      const inputName = inputRef.current.value;

      // 입력된 이름과 일치하는 멤버를 찾음
      const matchingMember = memberData.find((member) => member.name === inputName);

      // 일치하는 멤버가 있다면 해당 멤버의 'hash'값을 'section' 상태로 업데이트하고, 페이지의 해시 값을 변경함
      if (matchingMember) {
        setSection(matchingMember.hash);
        window.location.hash = `#${matchingMember.hash}`;
      }
    }
  };

  // 페이지의 메인 컴포넌트를 반환함
  // 이 안에서 멤버 목록('ul')과 멤버 소개 내용('div')이 표시됨
  return (
    <main className={styles.main}>
      {/* 멤버 목록을 나타내는 부분 */}
      <div className={styles.head}>
        <ul>
          {memberData.map(({ hash, name }) => (
            <li key={hash} onClick={() => nameClick(hash)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      {/* 멤버 소개 내용을 타나내는 부분 */}
      <div className={styles.board}>
        {memberData.map(({ hash, content }) => (
          <div key={hash} id={hash} style={{ display: section === hash ? 'block' : 'none' }}>
            {content}
          </div>
        ))}
        {memberData.map(({ hash, contentTwo }) => (
          <div key={hash} id={hash} style={{ display: section === hash ? 'block' : 'none' }}>
            {contentTwo}
          </div>
        ))}
        {memberData.map(({ hash, contentThree }) => (
          <div key={hash} id={hash} style={{ display: section === hash ? 'block' : 'none' }}>
            {contentThree}
          </div>
        ))}
        {memberData.map(({ hash, contentFour }) => (
          <div key={hash} id={hash} style={{ display: section === hash ? 'block' : 'none' }}>
            {contentFour}
          </div>
        ))}
        <div>
          {/* 검색을 위한 input 요소와 버튼을 나타내는 부분 */}
          <label htmlFor="customInput"></label>
          <input type="text" name="customInput" ref={inputRef} placeholder="Write your name." />
        </div>
        <div>
          <button onClick={handleSearch}>Show</button>
        </div>
      </div>
    </main>
  );
}