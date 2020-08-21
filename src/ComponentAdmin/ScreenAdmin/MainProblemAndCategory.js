import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Card, Button } from "react-bootstrap";

import ContentBox from '../../shared/components/UIElements/ContentBox';
import List from '../AdminCRUDComp/Hospital/List'
// import NavAdmin from "../NavbarAdmin/NavAdmin";
export default class MainProblemAndCategory extends Component {
  render() {
    const DUMMY_DATA = [
      {
        id: "1",
        text: 'Category',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTg7R7FZ7vQKUy23DTj1jsUb2n5paHFknnee7_NalQW29QYwzN2',
        to: '/MainCategory/Category'
      },
      {
        id: "2",
        text: 'Problem/Diagnosis',
        icon: 'https://nozakikun-cafe.com/image/chara-1.png',
        to: '/CRUDproblem'
      }
    ]

    return (
      <ContentBox>
        <List cardContent={DUMMY_DATA} />
      </ContentBox>
    );
  }
}
