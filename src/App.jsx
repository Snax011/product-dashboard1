import { useMemo, useState } from 'react'
import { Box, Container, FormControlLabel, Switch, Typography } from '@mui/material'
import ProductList from './components/ProductList'

// App owns the product data and the availability filter state.
function App() {
	const [showInStockOnly, setShowInStockOnly] = useState(false)

	const products = [
		{ id: 1, name: 'Wireless Mouse', price: 29.99, inStock: true },
		{ id: 2, name: 'Mechanical Keyboard', price: 89.99, inStock: false },
		{ id: 3, name: '4K Monitor', price: 349.99, inStock: true },
		{ id: 4, name: 'USB-C Hub', price: 44.99, inStock: false },
		{ id: 5, name: 'Laptop Stand', price: 39.99, inStock: true },
	]

	// Compute which products should render based on the toggle.
	const visibleProducts = useMemo(() => {
		if (!showInStockOnly) {
			return products
		}

		return products.filter((product) => product.inStock)
	}, [showInStockOnly])

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" fontWeight={700} mb={1}>
				Product Dashboard
			</Typography>

			<Typography variant="body1" color="text.secondary" mb={3}>
				Browse products and filter by availability.
			</Typography>

			<Box mb={2}>
				<FormControlLabel
					control={
						<Switch
							checked={showInStockOnly}
							onChange={(event) => setShowInStockOnly(event.target.checked)}
							slotProps={{
								input: {
									'aria-label': 'filter in-stock products',
									role: 'switch',
								},
							}}
						/>
					}
					label="Show in-stock products only"
				/>
			</Box>

			<ProductList products={visibleProducts} />
		</Container>
	)
}

export default App
