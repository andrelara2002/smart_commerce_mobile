import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native'

import Spacer from '../../components/Util/Spacer'
import CompanyCard from './Components/CompanyCard'
import Button from '../../components/Buttons/Button'
import Divisor from '../../components/Util/Divisor'
import CompanyStyles from './CompanyStyles'

export default function CompanyView(props) {
    const {
        id,
        description,
        products,
        distance,
        name,
        rank,
        logo,
        image,
        qtdVotacoes,
        colors,
        type,
        language
    } = props

    const [votou, setVotou] = React.useState(false);
    const styles = CompanyStyles(colors)
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("COMPANY VIEW LOADED")
        setVotou(props.votou);
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Spacer height={30} />
            <CompanyCard
                logo={logo}
                image={image}
                name={name}
                type={type}
                rank={rank}
                qtdVotacoes={qtdVotacoes}
                colors={colors}
                language={language}
            />
            {/* Spacer.------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <Spacer height={30} />
            <Text style={styles.description}>{description}</Text>
            {/* Spacer.-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <Spacer height={10} />
            <Text style={styles.distance}>{`${distance / 10000} Km`}</Text>
            {/* Spacer.------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <Spacer height={40} />
            <View style={styles.buttons}>
                <Button
                    width={200}
                    height={50}
                    isDark={true}
                    keyText={'Sugerir Produto'}
                />
                <Button
                    width={120}
                    height={50}
                    isDark={false}
                    keyText={loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text>{votou ? 'remover voto' : 'votar'}</Text>
                    )}
                    onPress={async () => {
                        setLoading(true)
                        var novoVoto = !votou;
                        setVotou(novoVoto);

                        await props.onSubmitVotar({
                            localId: id,
                            voto: novoVoto
                        })

                        setLoading(false)
                    }}
                />
            </View>
            <Spacer height={40} />

            <Text
                style={{
                    color: colors.textColor,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Produtos</Text>
            <FlatList
                horizontal={true}
                data={products}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.productsCard}>
                            <Text
                                style={styles.productsCardTitle}
                            >{item.nome}
                            </Text>
                            <Text style={styles.productsCardTitle}>{item.descricao}</Text>
                        </View>
                    )
                }} />
            <Divisor height={20} color={colors.backgroundSecondary} />
        </ScrollView>
    )
}