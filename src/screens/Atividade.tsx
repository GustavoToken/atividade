import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all';

interface Country {
    name: {
        common: string;
    };
    capital: string[];
    region: string;
    languages: {
        [key: string]: string;
    };
    flags: {
        png: string;
        svg: string;
    };
}

interface CountryListItemProps {
    country: Country;
}

const CountryListItem: React.FC<CountryListItemProps> = ({ country }) => {
    return (
        <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.flag, styles.flagWithBorder]}
                    source={{ uri: country.flags.png }}
                />
                <View style={styles.countryDetails}>
                    <Text>
                        <Text>Nome:</Text> {country.name.common}
                    </Text>
                    {country.capital && (
                        <Text>
                            <Text>Capital:</Text> {country.capital.join(', ')}
                        </Text>
                    )}
                    <Text>
                        <Text>Região:</Text> {country.region}
                    </Text>
                    {country.languages && (
                        <Text>
                            <Text>Linguagem:</Text> {Object.values(country.languages).join(', ')}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};




const CountryListScreen: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setCountries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os países:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={countries}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => <CountryListItem country={item} />}
                />
            )}
        </SafeAreaView>
    );
};

const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'grey',
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
    },
    countryInfo: {
        flexDirection: 'row',
    },
    flag: {
        width: 80,
        height: 55,
        marginRight: 10,
        marginTop: 6,
    },
    countryDetails: {
        flex: 1,
    },
    boldText: {
        fontWeight: 'bold',
    },
    flagWithBorder: {
        borderWidth: 2,
        borderColor: 'black',
    },
};

export default CountryListScreen;
