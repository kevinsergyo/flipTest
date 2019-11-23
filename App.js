import React, { Component } from 'react';
import { TextInput, FlatList, Platform, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataTransaksi: [],
      dataDefault: []
    }
  }
  componentDidMount() {
    return fetch('https://nextar.flip.id/frontend-test')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataDefault: Object.keys(responseJson).map(key=>({key,...responseJson[key]})),
          dataTransaksi: Object.keys(responseJson).map(key=>({key,...responseJson[key]})),
        }, function() {
          console.log(this.state.dataTransaksi)
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    filterName (TextInputValue) {
      this.setState({
        dataTransaksi: this.state.dataDefault.filter(item => item.beneficiary_name.toUpperCase().includes(TextInputValue.toUpperCase()))
      })
    }

    reformatDate (date) {
      var bulan;
      switch (date.substring(5,7)) {
        case "1":
          bulan = "Januari";
          break;
        case "2":
          bulan = "Februari";
          break;
        case "3":
          bulan = "Maret";
          break;
        case "4":
          bulan = "April";
          break;
        case "5":
          bulan = "Mei";
          break;
        case "6":
          bulan = "Juni";
          break;
        case "7":
          bulan = "Juli";
          break;
        case "8":
          bulan = "Agustus";
          break;
        case "9":
          bulan = "Septemberr";
          break;
        case "10":
          bulan = "Oktober";
          break;
        case "11":
          bulan = "November";
          break;
        case "12":
          bulan = "Desember";
          break;
        default:
          break;
      }
      return date.substring(8,10) + " " + bulan + " " + date.substring(0,4)
    }

    reformatAmount (amount){
      amount = String(amount);
      var newAmount = "Rp";
      for(let i = 0; i < amount.length; i++){
        if(i!=0){
          if((amount.length-i)%3==0){
            newAmount+=".";
            newAmount+=amount.charAt(i);
          }else{
            newAmount+=amount.charAt(i);
          }
        }else{
          newAmount+=amount.charAt(i);
        }
      }
      return newAmount;
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Data Transaksi FLIP</Text>
        <TextInput
        style={styles.cariNama}
        placeholder= "Cari nama"
        onChangeText={ TextInputValue => this.filterName(TextInputValue) }
        underlineColorAndroid='transparent'
        />
        <FlatList
          style={styles.listStyle}
          data={this.state.dataTransaksi}
          renderItem={ ({item}) =>
          <View style={styles.listItem}>
          <Text style={{fontWeight:'bold'}}>
          {item.beneficiary_bank.toUpperCase()} {'\u2794'} {item.sender_bank.toUpperCase()}
          </Text>
          <Text>
          {item.beneficiary_name.toUpperCase()}
          </Text>
          <Text>
          {this.reformatAmount(item.amount)} {'\u25cf'} {this.reformatDate(item.completed_at)}
          </Text>
          <Text style={styles.transStatus}>
          Berhasil
          </Text>
          </View>}
          keyExtractor={rowData => rowData.id}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBECF0',
  },
  title: {
    width:'100%',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 30,
    backgroundColor: '#F05E23',
    color: 'white',
    fontWeight: 'bold'
  },
  cariNama:{
    width:'97%',
    margin:6,
    padding:5,
    paddingLeft:15,
    backgroundColor:'white',
    borderRadius:5,
  },
  listStyle:{
    width:'97%',
    marginBottom:60
  },
  listItem:{
    width:'100%',
    padding:10,
    marginBottom:5,
    borderRadius:5,
    borderLeftWidth:5,
    borderLeftColor:'#5AAB61',
    backgroundColor: 'white'
  },
  transStatus:{
    marginTop:-40,
    marginBottom:15,
    marginLeft:265,
    marginRight:5,
    textAlign:'right',
    padding:4,
    borderRadius:5,
    backgroundColor: '#5AAB61',
    color:'white',
    fontWeight: 'bold'
  }
});
