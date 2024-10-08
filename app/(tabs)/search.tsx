import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, Image, TouchableOpacity, View, TextInput, ScrollView, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faCircleXmark, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'expo-router';
import {fetchSearchHistory,addToHistory,deleteFromHistory } from '../../utils/searchApi';

export default function SearchScreen() {
  const [search, setSearch] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  
  const searchBarRef = useRef<TextInput>(null);
  useEffect(() => {
    if (focused || search.length > 0) {
      searchBarRef.current?.focus();
      
      const loadSearchHistory = async () => {
        try {
          const history = await fetchSearchHistory();
          setSearchHistory(history);
        } catch (error) {
          console.error('Failed to load search history:', error);
        }
      };
      loadSearchHistory();
    } else {
      searchBarRef.current?.blur();
    }
  }, [focused, search.length]); // Added search.length as a dependency
  

   const renderItem = ({ item }: { item: { id: string, imgURL: string, text: string } }) => (
     <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handleSelection(item.text)}>
       <Image source={{ uri:item.imgURL }} style={styles.image} />
       <View style={styles.overlay} />
       <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
     </TouchableOpacity>
   );

  const handleCancel = () => {
    setSearch('');
    setFocused(false);
  };

  const handleSelection = (search: string) => {
    setSearch(search);
    addToHistory(search)
    // make search action
  };
  const handleRemove=(search:string)=>{
   setSearchHistory(searchHistory.filter(e => e !== search))
   deleteFromHistory(search)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* search bar component */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            {!focused && <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />}
            <TextInput
              placeholder="Search for ideas"
              onChangeText={setSearch}
              value={search}
              style={styles.input}
              ref={searchBarRef}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSubmitEditing={() => handleSelection(search)}

            />
            {search.length === 0 ? (
              <FontAwesomeIcon icon={faCamera} style={styles.icon} />
            ) : (
              <TouchableOpacity onPress={() => setSearch('')}>
                <FontAwesomeIcon icon={faCircleXmark} style={{ ...styles.icon, opacity: 0.9 }} />
              </TouchableOpacity>
            )}
          </View>

          {focused && (
            <Button
              title="Cancel"
              onPress={handleCancel}
              buttonStyle={styles.cancelButton}
              containerStyle={styles.cancelButtonContainer}
              titleStyle={styles.cancelButtonText}
            />
          )}
        </View>
        {/* suggestion for you */}
        {!focused && (
          <View>
            <Text style={styles.header}>Ideas for you</Text>
            <FlatList
              data={forYou}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={renderItem}
            />
            <Text style={styles.header}>Popular on Pinterest</Text>
            <FlatList
              data={popularOnPinterest}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={renderItem}
            />
          </View>
        )}
        {/* search resaukts */}
        {focused && (
          <ScrollView keyboardShouldPersistTaps="handled">
            {search.length === 0 &&
              searchHistory.slice(0, 20).map(item => (
                item.toLowerCase().includes(search.toLowerCase()) &&
                <TouchableOpacity key={item} onPress={() => handleSelection(item)} style={styles.searchItem}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size={15} color="#000" style={styles.searchIcon} />
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.searchText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                    <TouchableOpacity onPress={() => handleRemove(item)}>
                      <FontAwesomeIcon icon={faXmark} size={20} color='gray' />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            }

              {search.length > 0 && (
                <>
                  {categories
                    .filter(item => item.toLowerCase().includes(search.toLowerCase())) // Filter the categories based on the search term
                    .slice(0, 6) 
                    .map(item => (
                      <TouchableOpacity key={item} onPress={() => handleSelection(item)} style={styles.searchItem}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={15} color="#000" style={styles.searchIcon} />
                        <Text style={styles.searchText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                      </TouchableOpacity>
                    ))
                  }

                  <Text style={styles.suggestionText}>Looking for ideas you saved?</Text>
                  <Link href={`/saved?search=${encodeURIComponent(search)}`} asChild>
                    <Button title="Search your pins" buttonStyle={styles.myPinsButton} onPress={() => {/* handle press */}} />
                  </Link>
                </>
              )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  icon: {
    padding: 10,
    opacity: 0.8
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  cancelButtonContainer: {},
  cancelButtonText: {
    color: 'black',
    fontSize: 18
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    zIndex: 10,
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  smallSearchText: {
    fontSize: 14,
    color: '#555',
  },
  searchImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestionText: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 20,
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  myPinsButton: {
    backgroundColor: 'lightgrey',
    color: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});




interface Pin {
  id: string;
  imgURL: string;
  text: string;
}
const popularOnPinterest: Pin[] = [
  {
    id: 'id001',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Healthy Dinner Recipes',
  },
  {
    id: 'id002',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Blue Wallpaper Ideas',
  },
  {
    id: 'id003',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Room Ideas',
  },
  {
    id: 'id004',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Selfie Poses',
  },
  {
    id: 'id005',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pink Backgrounds',
  },
  {
    id: 'id006',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Art',
  },
]
const forYou:Pin[]=[
  {
    id: 'id007',
    imgURL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Cats',
  },
  {
    id: 'id008',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Dogs',
  },
]
const categories:string[] = ["Art","Science","Technology","Health","Education","Sports","Travel","Food","Fashion","Finance","Music","Movies","Books","History","Photography","Design","Marketing","Business","Real Estate","Fitness","Nature","Animals","Gaming","Politics","Religion","Philosophy","Psychology","Parenting","Relationships","Environment","Social Media","Startups","Programming","DIY","Crafts","Home Decor","Gardening","Cooking","Baking","Architecture","Automotive","Aerospace","Astronomy","Biotechnology","Chemistry","Physics","Mathematics","Artificial Intelligence","Blockchain","Cryptocurrency","Augmented Reality","Virtual Reality","E-commerce","Investing","Insurance","Accounting","Entrepreneurship","Leadership","Management","Sales","Customer Service","Human Resources","Recruiting","Networking","Public Relations","Event Planning","Project Management","Supply Chain","Logistics","Manufacturing","Quality Control","Sustainability","Agriculture","Forestry","Fishing","Renewable Energy","Oil & Gas","Mining","Aviation","Maritime","Telecommunications","Media","Journalism","Advertising","Copywriting","SEO","Content Marketing","Influencer Marketing","Affiliate Marketing","Email Marketing","Branding","Graphic Design","Web Design","UX/UI","Interior Design","Product Design","Fashion Design","Jewelry Design","Textile Design","Industrial Design"];
