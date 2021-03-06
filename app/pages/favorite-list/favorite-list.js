import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {MealDetailsPage} from '../meal-details/meal-details';
import {MealService} from '../../services/meal-service';

@Page({
    templateUrl: 'build/pages/favorite-list/favorite-list.html'
})
export class FavoriteListPage {

    static get parameters() {
        return [[NavController], [NavParams], [MealService]];
    }

    constructor(nav, navParams, mealService) {
        this.nav = nav;
        this.mealService = mealService;
        this.selectedItem = navParams.get('item');
    }

    ngOnInit() {
        this.mealService.getFavorites().subscribe(
            data => this.meals = data
        );
    }

    itemTapped(event, meal) {
        this.nav.push(MealDetailsPage, {
            meal: meal
        });
    }

    deleteItem(event, meal) {
        this.mealService.unfavorite(meal).subscribe();
    }

}