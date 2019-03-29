import express from 'express';
import { showAllLanguage, addLanguage, registerUser, addQuestion, postAnswer,addLike, addUnLike,showAllAnswer, showAllQuestion, showAllQuestionDetailPage, userAuth} from '../controller/controller';
const router = express.Router({mergeParams : true});

router.route('/showlangcat').post(showAllLanguage);
router.route('/addlangcat').post(addLanguage);
router.route('/registerUser').post(registerUser);
router.route('/addquestion').post(addQuestion);
router.route('/postAnswer').post(postAnswer);
router.route('/addlike').post(addLike);
router.route('/addunlike').post(addUnLike);
router.route('/showanswers').get(showAllAnswer);
router.route('/showquestion').get(showAllQuestion);
router.route('/fetchQuestion').get(showAllQuestionDetailPage);
router.route('/fetchLoggedInUser').post(userAuth);

export default router;