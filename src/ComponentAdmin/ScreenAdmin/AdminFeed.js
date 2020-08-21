import React, { Component } from "react";
import ContentBox from '../../shared/components/UIElements/ContentBox';
import List from '../AdminCRUDComp/Hospital/List'

export default class AdminFeed extends Component {
  render() {
    const DUMMY_DATA = [
      {
        id: "1",
        text: 'จัดการข้อมูลหลัก',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTg7R7FZ7vQKUy23DTj1jsUb2n5paHFknnee7_NalQW29QYwzN2',
        to: '/MainAddData',
        moreInfo: [
          {
            title: "จัดการข้อมูลของโรงพยาบาล",
            navigate: "/MainCategory/Hospital"
          },
          {
            title: "จัดการข้อมูลของโรค",
            navigate: "/MainProblemAndCategory"
          }
        ]
      },
      {
        id: "2",
        text: 'จัดการข้อมูลผู้ใช้',
        icon: 'https://nozakikun-cafe.com/image/chara-1.png',
        to: '/CRUDuser',
        moreInfo: [
          {
            title: "จัดการข้อมูลของนักศึกษา",
            navigate: "/CRUDuser"
          }
        ]
      }
    ]
    return (
      <ContentBox>
        <List 
          cardContent={DUMMY_DATA} 
          mainMenu
        />
      </ContentBox>
    );
  }
}
