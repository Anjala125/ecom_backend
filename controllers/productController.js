import Product from "../models/product.js";

export const createProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const getProducts = async (req, res) => {

    try {

        const keyword = req.query.search || "";

        const products = await Product.find({

            name: {
                $regex: keyword,
                $options: "i"
            }

        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};