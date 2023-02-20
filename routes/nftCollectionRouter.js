const express =require("express")
const router=express.Router()
const {
    addOrUpdateNftCollection,
    getAllNftCollection,
    getAllNftByChainName,
    getMyNftCollection,
    getNftCollectionByChainNameAndUserName,
    updateNftNameOrDescription,
    getNftByNftCollectionId,
    toggleLikeNft,
    AddNftComments,
    getNftComments,
    DeleteNftComments,
    getAllNftByUserName
} =require('../controllers/nftCollectionController');
const {verifyToken}=require('../middleware/auth');

router.get("/addOrUpdate",addOrUpdateNftCollection);

/**
 * @swagger
 * /api/v1/nftCollection/updateNftNameOrDescription:
 *   put:
 *     tags:
 *       - NftCollections
 *     description: update nft name or description by nftCollectionId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: nftCollectionId required.
 *         in: formData
 *         required: true
 *       - name: lazyName
 *         description: lazyName.
 *         in: formData
 *       - name: lazyDescription
 *         description: lazyDescription.
 *         in: formData
 *     responses:
 *       200:
 *         description: Nft Updated successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.put("/updateNftNameOrDescription",verifyToken,updateNftNameOrDescription);
router.get("/getAllNft",getAllNftCollection);
/**
 * @swagger
 * /api/v1/nftCollection/getAllNftByChainName:
 *   get:
 *     tags:
 *       - NftCollections
 *     description: get your all nft collection by chainName
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: chainName
 *         description: chainName required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,Your nft fetch successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.get("/getAllNftByChainName",getAllNftByChainName);

/**
 * @swagger
 * /api/v1/nftCollection/getNftByNftCollectionId:
 *   get:
 *     tags:
 *       - NftCollections
 *     description: get your  nft collection by nftCollectionId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: nftCollectionId required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,Your nft fetch successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.get("/getNftByNftCollectionId",getNftByNftCollectionId);

/**
 * @swagger
 * /api/v1/nftCollection/getAllNftByUserName:
 *   get:
 *     tags:
 *       - NftCollections
 *     description: get your  nft collection by userName
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: userName required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,Your  all nft fetch successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.get("/getAllNftByUserName",getAllNftByUserName)
router.get("/getMyNft",verifyToken,getMyNftCollection);

/**
 * @swagger
 * /api/v1/nftCollection/getNftCollectionByChainNameAndUserName:
 *   get:
 *     tags:
 *       - NftCollections
 *     description: get your  nft collection by chainName and userName
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: chainName
 *         description: chainName required.
 *         in: formData
 *         required: true
 *       - name: userName
 *         description: userName required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,Your  all nft fetch successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.get("/getNftCollectionByChainNameAndUserName",getNftCollectionByChainNameAndUserName);

/**
 * @swagger
 * /api/v1/nftCollection/toggleLike:
 *   put:
 *     tags:
 *       - NftCollections
 *     description: like or dislike nft collection by nftCollectionId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: nftCollectionId required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: nft like/dislike successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */




router.put("/toggleLike",verifyToken,toggleLikeNft)

/**
 * @swagger
 * /api/v1/nftCollection/toggleLike:
 *   put:
 *     tags:
 *       - NftCollections
 *     description: like or dislike nft collection by nftCollectionId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: nftCollectionId required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: nft like/dislike successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

//api for comment......
router.put("/AddNftComments", AddNftComments)
router.get("/getNftComments", getNftComments)
//.......  end*/

router.delete("/DeleteNftComments", DeleteNftComments)








module.exports=router