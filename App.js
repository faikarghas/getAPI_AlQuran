import React, { PureComponent } from 'react';
import { ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import {
    Container, Header, Body, Button,
    Content, Item, Text, Thumbnail, Footer, Title, Tab, Separator, ListItem, List, Right, Left, Icon, Input, View
} from 'native-base';
import axios from 'axios';


class HomeScreen extends PureComponent {
    constructor() {
        super();
        this.state = { member: [], nama: '' };
    }

    getHandler = () => {
        let angka = this.state.nama;
        const url = 'http://api.alquran.cloud/surah/' + angka;
        axios.get(url).then((ambilData) => {
            this.setState({
                member: Object.values(ambilData.data.data.ayahs),
                member2: ambilData.data.data.name,
                member3: ambilData.data.data.englishName,


            })
        })
    }

    onSumbitChangeHandler = val =>{
        this.setState({
            nama:val
        })
    }

    render() {

        const data = this.state.member.map((item, index) => {
            let list = item.numberInSurah
            let Ename = item.text
            return <List key={index}>
                <ListItem >
                    <Left>
                    <Text style={{ fontSize: 10, color: 'black',width:'20%' }}>  {list} </Text>
                    </Left>
                    <Text style={{ fontSize: 25, color: 'black',width:'80%' }}>  {Ename} </Text>
                </ListItem>
            </List >

        })


        return (
            <Container style={{ backgroundColor:'#efffbf'}}>   
                <Header searchBar rounded style={{ backgroundColor: '#4d7f55' }}>
                    <StatusBar
                        backgroundColor='white'
                        barStyle="dark-content" //"dark-content"
                    />
                    <Item>
                        <Input placeholder="Masukan Nomor surat..." onChangeText={this.onSumbitChangeHandler} />
                        {/* <TouchableOpacity> */}
                            <TouchableOpacity transparent onPress={this.getHandler} ><Icon name="search" style={{ color: 'black' }}/></TouchableOpacity>
                        {/* </TouchableOpacity> */}
                    </Item>
                </Header>

                <ScrollView>
                    <Separator bordered style={{ backgroundColor:'#fbfff2'}}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'black',fontWeight:'bold' }}>{this.state.member3}</Text>
                    </Separator>
                    {data}
                </ScrollView>
            </Container>
        );
    }
}

export default HomeScreen
